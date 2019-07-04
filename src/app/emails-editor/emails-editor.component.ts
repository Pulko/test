import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'emails-editor',
  templateUrl: './emails-editor.component.html',
  styleUrls: ['./emails-editor.component.scss']
})

export class EmailsEditorComponent implements OnInit {

  emails: {email: string; isValid: boolean, id: number}[] = [];

  private regExpEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  protected isValidEmail(value: string): boolean {
    return this.regExpEmail.test(value);
  }

  protected removeLastOne(element: HTMLTextAreaElement) {
    const { emails } = this;
    if (!element.value.length) {
      emails.splice(emails.length - 1, 1);
      this.emails = emails;
    }
  }

  protected emailsCount() {
    alert(this.emails.length);
  }

  protected addRandomEmail() {
    const name = this.randomString(6);
    const mail = this.randomString(4);
    const domain = this.randomString(2);
    const randomEmail = name + "@" + mail + "." + domain;
    if (this.isValidEmail(randomEmail)) {
      this.emails.push({ 
        email: randomEmail, 
        isValid: true,
        id: this.emails.length
        });
    } else {
      console.log("Even random string could not be fine enough");
    }
  }

  protected randomString(length: number): string {
    let string = "";
    let randomAscii;
    for(let i = 0; i < length; i++) {
      randomAscii = Math.floor((Math.random() * 25) + 97);
        string += String.fromCharCode(randomAscii)
    }
    return string
  }

  protected removeItself(event: any) {
    const { emails } = this;
    let parentText = event.currentTarget.parentElement.parentElement.textContent
    let parentContent = parentText.substring(0, parentText.length - 1);
    // dirty
    const result = emails.filter( ( email ) => { return email.email !== parentContent } );
    this.emails = result;
  }

  protected onEnter(element: HTMLTextAreaElement) {
    const value: string = element.value;

    
    
    if (value) {
      this.cleanInput(element);

      if (this.isValidEmail(value)) {
        this.emails.push({ 
          email: value, 
          isValid: true, 
          id: this.emails.length });
      } else {
        this.emails.push({ 
          email: value, 
          isValid: false, 
          id: this.emails.length });
      }
    }
  }

  protected onKeyUp(element: HTMLTextAreaElement) {
    const value: string = element.value;

    if (value.indexOf(",") > -1) {
      element.value = value.substring(0, value.length - 1);
      this.onEnter(element);
    } else {
      if (this.isValidEmail(value)) {
        this.onEnter(element);
      }
    }
  }

  protected onBlur(element: HTMLTextAreaElement) {
    this.onEnter(element);
  }

  protected onWrapperFocus(element: HTMLTextAreaElement) {
    element.focus();
  }

  protected cleanInput(element: HTMLTextAreaElement) {
    element.value = null;
  }
  
  constructor() { }

  ngOnInit() {
  }

}
