export interface IUserPersistence {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	password: string;
	salt: string;
	role: string
  }