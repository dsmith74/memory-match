import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounceTime';

import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
	@ViewChildren(CardComponent) childrenComponents: QueryList<CardComponent>;

	private readonly STARTING_VALUES: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	private cardSelectionOne: BehaviorSubject<CardComponent> = new BehaviorSubject<CardComponent>(null);
	private cardSelectionTwo: BehaviorSubject<CardComponent> = new BehaviorSubject<CardComponent>(null);
	private children: CardComponent[];
	private pauseActionUntilCheck: boolean = false;
	private lastIndex: number = null;

	public cards: number[];
	public attemptsCounter: number = 0;

	constructor(private cd: ChangeDetectorRef ) {
		this.setUpCards();

		//Set up subscription of whenever the second card is selected
		//Wait 1 second before executing in order to ensure time for card to flip
		this.cardSelectionTwo.debounceTime(1000).subscribe(card => {
			if(card) {
				this.checkMatch();
			}
		});
	}

	ngAfterViewInit() {
		this.initChildrenArray();
	}

	/**
	 * Function that takes the appropriate action when a card is selected from the game board. 
	 * If the pause action flag is set, no further cards can be selected. This is to ensure 
	 * that the user doesn't quickly select more than two cards at a time until the first two cards are checked.
	 * This function is also ensure that the card selection cannot be undone.
	 * @param cardNumber The number that belongs to the card selected
	 * @param index The index of the card within the card array
	 */
	public registerSelection(cardNumber: number, index: number): void {
		if(this.pauseActionUntilCheck) {
			return;
		}

		//You can't undo your selection
		if(this.lastIndex === index) {
			return;
		}

		this.children[index].flipCard();

		if(this.cardSelectionOne.value) {
			//this is the second selection
			this.attemptsCounter++;
			this.cardSelectionTwo.next(this.children[index]);
			this.pauseActionUntilCheck = true;
		} else {
			//this is the first selection
			this.cardSelectionOne.next(this.children[index]);
		}

		this.lastIndex = index;
	}

	/**
	 * Function that will reset the entire gameboard back to the default state
	 */
	public resetGameBoard(): void {
		this.attemptsCounter = 0;
		this.cardSelectionOne.next(null);
		this.cardSelectionTwo.next(null);
		for(let i = 0; i < this.children.length; i ++) {
			const child = this.children[i];
			child.resetCard();
		}
		this.setUpCards();
		this.cd.detectChanges();
		this.initChildrenArray();
	}

	/**
	 * Set the children array based on the ViewChildren variable
	 */
	private initChildrenArray() {
		this.children = this.childrenComponents.toArray();
	}

	/**
	 * Helper function which sets up the cards variable
	 */
	private setUpCards(): void {
		const doubleArray = this.STARTING_VALUES.concat(this.STARTING_VALUES);
		this.cards = this.shuffleArray(doubleArray);
	}

	/**
	 * Function that checks whether the two selected cards 
	 * are a match or not. If they are, set the cards to success.
	 * Otherwise, flip the cards back over
	 */
	private checkMatch() {
		if(this.cardSelectionOne.value.getNumber() === this.cardSelectionTwo.value.getNumber()) {
			//They are a match, set success
			this.cardSelectionOne.value.setSuccess();
			this.cardSelectionTwo.value.setSuccess();
		} else {
			//Not a success, flip back over
			this.cardSelectionOne.value.flipCard();
			this.cardSelectionTwo.value.flipCard();
		}
		this.cardSelectionOne.next(null);
		this.cardSelectionTwo.next(null);
		this.lastIndex = null;
		this.pauseActionUntilCheck = false;
	}

	/**
	 * Using a JavaScript implementation of the 
	 * Durstenfeld shuffle, a computer-optimized version 
	 * of Fisher-Yates
	 * Found at https://stackoverflow.com/a/12646864
	 * @param array 
	 */
	private shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array.slice(0)
	}
}
