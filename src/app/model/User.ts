import { Photo } from 'src/app/model/Photo';

export class User {
  private _uid: string;
  private _firstname: string;
  private _lastname: string;
  private _email: string;
  private _phone: string;
  private _creationDate: string;
  private _password: string;
  private _confirmPassword: string;
  private _photo?: string | Blob | Photo;

	constructor(uid: string, firstname: string, lastname: string, email: string, phone: string, creationDate: string, password: string, confirmPassword: string, photo: string | Blob | Photo ) {
		this._uid = uid;
		this._firstname = firstname;
		this._lastname = lastname;
		this._email = email;
		this._phone = phone;
		this._creationDate = creationDate;
		this._password = password;
		this._confirmPassword = confirmPassword;
		this._photo = photo;
	}


    /**
     * Getter uid
     * @return {string}
     */
	public get uid(): string {
		return this._uid;
	}

    /**
     * Getter firstname
     * @return {string}
     */
	public get firstname(): string {
		return this._firstname;
	}

    /**
     * Getter lastname
     * @return {string}
     */
	public get lastname(): string {
		return this._lastname;
	}

    /**
     * Getter email
     * @return {string}
     */
	public get email(): string {
		return this._email;
	}

    /**
     * Getter phone
     * @return {string}
     */
	public get phone(): string {
		return this._phone;
	}

    /**
     * Getter creationDate
     * @return {string}
     */
	public get creationDate(): string {
		return this._creationDate;
	}

    /**
     * Getter password
     * @return {string}
     */
	public get password(): string {
		return this._password;
	}

    /**
     * Getter confirmPassword
     * @return {string}
     */
	public get confirmPassword(): string {
		return this._confirmPassword;
	}

    /**
     * Getter photo
     * @return {string }
     */
	public get photo(): string | Blob | Photo  {
		return this._photo;
	}

    /**
     * Setter uid
     * @param {string} value
     */
	public set uid(value: string) {
		this._uid = value;
	}

    /**
     * Setter firstname
     * @param {string} value
     */
	public set firstname(value: string) {
		this._firstname = value;
	}

    /**
     * Setter lastname
     * @param {string} value
     */
	public set lastname(value: string) {
		this._lastname = value;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set email(value: string) {
		this._email = value;
	}

    /**
     * Setter phone
     * @param {string} value
     */
	public set phone(value: string) {
		this._phone = value;
	}

    /**
     * Setter creationDate
     * @param {string} value
     */
	public set creationDate(value: string) {
		this._creationDate = value;
	}

    /**
     * Setter password
     * @param {string} value
     */
	public set password(value: string) {
		this._password = value;
	}

    /**
     * Setter confirmPassword
     * @param {string} value
     */
	public set confirmPassword(value: string) {
		this._confirmPassword = value;
	}

    /**
     * Setter photo
     * @param {string } value
     */
	public set photo(value: string | Blob | Photo ) {
		this._photo = value;
	}
}
