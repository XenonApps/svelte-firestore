export class Contact {
  constructor(
    firstNameIn,
    lastNameIn,
    phonesIn = [],
    emailsIn = [],
    notesIn = []
  ) {
    this.firstName = firstNameIn;
    this.lastName = lastNameIn;
    this.emails = emailsIn;
    this.phones = phonesIn;
    this.notes = notesIn;
  }

  fullName() {
    return [this.firstName, this.lastName].join(' ');
  }

  toObject() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      emails: [...this.emails],
      phones: [...this.phones],
      notes: [...this.notes],
    };
  }

  static fromObject(contactObject) {
    return new Contact(
      contactObject.firstName,
      contactObject.lastName,
      [...contactObject.phones],
      [...contactObject.emails],
      [...contactObject.notes]
    );
  }
}
