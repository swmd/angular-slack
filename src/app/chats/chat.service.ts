import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Socket } from 'ng-socket-io';
// import { ChatMessage } from './chat.model';

@Injectable()
export class ChatService extends Socket {

	/**
	 * Event emitter if a message is edited
	 * Contains the edited message
	 */
	public onMessageEdited: EventEmitter<any>;

	/**
	 * Event emitter if a message is deleted
	 * Contains the id of the deleted message
	 */
	public onMessageDeleted: EventEmitter<string>;

	/**
	 * Event emitter if a message is sent
	 * Contains the sent message
	 */
	public onMessageSent: EventEmitter<any>;

	constructor(@Inject("_OPTIONS_") private options, private authHttp: AuthHttp) {
		super({url: environment.hostUrl, options});
		// this.ioSocket.connect();
		this.onMessageEdited = new EventEmitter();
		this.onMessageDeleted = new EventEmitter();
		this.onMessageSent = new EventEmitter();
	}

	getMessage() {
		return this.fromEvent<any>("receive")
			.map(data => data.msg);
	}

	sendMessage(message: any) {
		this.ioSocket.emit('send', message);
  	}

	/**
	 * Gets all the messages for the specified group
	 * @param groupId The group id
	 */
	public getAll(): Observable<Array<any>> {
		let url = `${environment.apiUrl}/chats`;
		return this.authHttp.get(url)
			.map(r => r.json());
	}

	/**
	 * Gets a single message
	 * @param groupId The group id
	 */
	public get(groupId: string): Observable<any> {
		return this.authHttp.get(`${environment.apiUrl}/groups/${groupId}/messages`)
			.map(r => r.json());
	}

	/**
	 * Deletes a message from a group
	 * @param groupId The group id
	 * @param id The message id
	 */
	public delete(groupId: string, id: string): Observable<boolean> {
		return this.authHttp.delete(`${environment.apiUrl}/groups/${groupId}/messages/${id}`)
			.map(response => response.status === 204)
			.do(() => this.onMessageDeleted.emit(id));
	}

	/**
	 * Creates a new message in a group
	 * @param groupId The group id
	 * @param chatMessage The message to create
	 */
	public create(groupId: string, chatMessage: any): Observable<any> {
		return this.authHttp.post(`${environment.apiUrl}/groups/${groupId}/messages`, chatMessage)
			.map(response => response.json())
			.do((message) => this.onMessageSent.emit(message));
	}

	/**
	 * Updates a message in a group
	 * @param groupId The group id
	 * @param id The message id
	 * @param chatMessage The updated message
	 */
	public update(groupId: string, id: string, chatMessage: any): Observable<any> {
		return this.authHttp.put(`${environment.apiUrl}/groups/${groupId}/messages/${id}`, chatMessage)
			.map(response => response.json())
			.do((message) => this.onMessageEdited.emit(message));
	}
}
