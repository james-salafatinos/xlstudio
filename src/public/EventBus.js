class EventBus {
    constructor() {
      this.listeners = {};
    }
  
    on(event, callback) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);

    }
  
    off(event, callback) {
      if (!this.listeners[event]) {
        return;
      }
      const index = this.listeners[event].indexOf(callback);
      if (index > -1) {
        this.listeners[event].splice(index, 1);
      }
    }
  
    emit(event, data) {
      console.log('hi', event, data)
      const callbacks = this.listeners[event];
      const results = []; // Array to store results from callbacks
      if (callbacks) {
        callbacks.forEach((callback) => {
          const result = callback(data); // Collect the result from each callback
          if (result !== undefined) { // Check if result is not undefined
            results.push(result); // Add result to results array
          }
        });
      }
      return results; // Return the collected results
    }
  }
  
  export { EventBus }