import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {
  messages: { text: string; isBot: boolean }[] = [];
  userMessage = '';

  constructor() {}

  ngOnInit(): void {
    this.addBotMessage('Hello! I\'m your chatbot. How can I help you today?');
  }

  addBotMessage(text: string) {
    this.messages.push({ text: text, isBot: true });
  }

  addUserMessage(text: string) {
    this.messages.push({ text: text, isBot: false });
  }

  sendMessage() {
    if (this.userMessage.trim() !== '') {
      this.addUserMessage(this.userMessage);
      this.respondToUser(this.userMessage);
      this.userMessage = '';
    }
  }

  respondToUser(userMessage: string) {
    const lowerCaseMessage = userMessage.toLowerCase();
    let response = '';

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      response = 'Hello! How can I assist you today?';
    } else if (lowerCaseMessage.includes('how are you')) {
      response = "I'm just a bot, but I'm here to help!";
    } else if (lowerCaseMessage.includes('bye')) {
      response = 'Goodbye! Have a great day!';
    } else {
      response = "I'm not sure how to respond to that.";
    }

    this.addBotMessage(response);
  }
}
