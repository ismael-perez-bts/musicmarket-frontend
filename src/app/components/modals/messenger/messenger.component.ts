import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from '../../../firebase/firebase.service';
import { LocalStorageService } from '../../../services/localstorage.service';
import { ChatService } from '../../../services/chats.service';
import { User } from '../../../models/user.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  @Input() profile: User;

  public own;

  public message: string = '';

  public messages: Array<any> = [];


  constructor(
    private readonly modalService: NgbModal,
    private readonly firebaseService: FirebaseService,
    private readonly localStorageService: LocalStorageService,
    private readonly chatService: ChatService,
    public elRef: ElementRef
  ) {
    let own = localStorageService.getItem('profile');

    if (own) {
      this.own = JSON.parse(own);
    }
  }

  ngOnInit() {

  }

  async open(content) {
    console.log(this.profile);
    this.chatService.getChatMeta(this.profile.uid).subscribe(async () => {
      await this.modalService.open(content);
      this.subscribeToChat();
    }, err => {
      debugger;
    });
    // await this.modalService.open(content);
    // this.subscribeToChat();
  }

  private getChatId(uid1, uid2) {
    let chatIdComparison = uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
    return `chat_${chatIdComparison}`;
  }

  sendMessage() {
    let chatId = this.getChatId(this.own.uid, this.profile.uid);
    let chatRef = this.firebaseService.firebase.database().ref(`messages/${chatId}`);
    let chatMetaRef = this.firebaseService.firebase.database().ref(`chats/${chatId}`);
    let date = new Date();
    let timestamp = date.getTime()

    if (!this.message) {
      return;
    }    
    
    chatRef.push().set({
      sender: this.own.uid,
      message: this.message,
      timestamp
    }, err => {
      chatMetaRef.set({ 
        message: this.message,
        timestamp,
        sender: this.own.uid,
        users: {
          [this.own.uid]: { name: this.own.name, uid: this.own.uid, photo_url: this.own.photo_url },
          [this.profile.uid]: { name: this.profile.name, uid: this.profile.uid, photo_url: this.profile.photo_url }
        }
      });
      this.message = '';
    });

  }

  public subscribeToChat() {
    let chatId = this.getChatId(this.own.uid, this.profile.uid);
    var chatRef = this.firebaseService.firebase.database().ref(`messages/${chatId}`).orderByChild('timestamp');

    // chatRef.once('value')
    // .then(snapshot => {
    //   if (snapshot.val()) {
    //     this.messages = this.formatMessages(snapshot.val());
    //     this.scrollToBottom();
    //   }
    // })
    // .catch(err => {

    // });

    chatRef.on('child_added', snapshot => {
      this.messages.push(snapshot.val());
      this.scrollToBottom();
    });
  }

  private formatMessages(data) {
    let keys = Object.keys(data);
    let mappedKeys = keys.map(key => {
      return data[key];
    });

    return mappedKeys;
  }

  private scrollToBottom(): void {
    let elmnt = document.querySelector('.message-area');

    setTimeout(() => {
      elmnt.scrollTop = elmnt.scrollHeight;    
    }, 1)     
  }
}
