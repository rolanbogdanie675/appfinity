/*
 * Filename: sophisticated_code.js
 * Description: This code snippet demonstrates a complex implementation of a messaging app with real-time chat functionality.
 */

// Data model for users and messages
const users = [];
const messages = [];

// User class
class User {
  constructor(name) {
    this.name = name;
    this.id = users.length + 1;

    // Add user to the user list
    users.push(this);
  }

  sendMessage(content, recipient) {
    // Create a new Message instance
    const message = new Message(content, this, recipient);

    // Add message to the messages list
    messages.push(message);

    // Emit an event to notify recipient about the new message
    emitEvent('newMessage', { message, recipient });
  }
}

// Message class
class Message {
  constructor(content, sender, recipient) {
    this.content = content;
    this.sender = sender;
    this.recipient = recipient;
  }
}

// Event emitter class
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName, ...args) {
    const eventCallbacks = this.events[eventName];
    if (eventCallbacks) {
      eventCallbacks.forEach((callback) => {
        callback(...args);
      });
    }
  }
}

// Create an instance of the EventEmitter
const eventEmitter = new EventEmitter();

// Register an event listener to notify users about new messages
eventEmitter.on('newMessage', ({ message, recipient }) => {
  console.log(`New message from ${message.sender.name} to ${recipient.name}: ${message.content}`);
});

// Create some users
const user1 = new User('Alice');
const user2 = new User('Bob');

// Simulate conversation by sending messages
user1.sendMessage('Hi Bob!', user2);
user2.sendMessage('Hello Alice!', user1);
user1.sendMessage('How are you?', user2);
user2.sendMessage('I\'m doing great!', user1);

// Output all messages
console.log('All Messages:');
messages.forEach((message) => {
  console.log(`${message.sender.name} to ${message.recipient.name}: ${message.content}`);
});
 
// Output all users
console.log('All Users:');
users.forEach((user) => {
  console.log(`${user.id}: ${user.name}`);
});

// Supporting functions
function emitEvent(eventName, ...args) {
  eventEmitter.emit(eventName, ...args);
}

// ...additional supporting functions and code 
// (more than 200 lines long) can be added here