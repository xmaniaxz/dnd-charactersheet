export function subscribe(DOCTYPE, eventName, listener) {
   if (arguments.length === 2) {
     listener = eventName;
     eventName = DOCTYPE;
     DOCTYPE = document;
   }
   DOCTYPE.addEventListener(eventName, listener);
}

export function unsubscribe(DOCTYPE, eventName, listener) {
   if (arguments.length === 2) {
     listener = eventName;
     eventName = DOCTYPE;
     DOCTYPE = document;
   }
   DOCTYPE.removeEventListener(eventName, listener);
}

export function publish(eventName, data) {
   const event = new CustomEvent(eventName, { detail: data });
   document.dispatchEvent(event);
}


