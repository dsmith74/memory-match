import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

	@Input() myNumber: number;

	private showNumber: boolean = false;
	private success: boolean = false;

	constructor() {}

	/**
	 * Getter for the myNumber variable
	 * Returns myNumber variable
	 */
	public getNumber(): number {
		return this.myNumber;
	}

	/**
	 * Sets the success variable to true
	 * Once this variable is set to true, no way for it to be undone unless the card is reset
	 */
	public setSuccess(): void {
		this.success = true;
	}

	/**
	 * Function to toggle the showNumber variable
	 */
	public flipCard(): void {
		if(!this.success) {
			this.showNumber = !this.showNumber;
		}
	}

	/**
	 * Function to reset the card back to it's original state
	 */
	public resetCard(): void {
		this.showNumber = false;
		this.success = false;
	}

}
