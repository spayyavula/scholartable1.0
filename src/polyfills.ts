// Polyfills and global definitions for browser compatibility

// Ensure globalThis is defined for older browsers
if (typeof globalThis === 'undefined') {
  (window as any).globalThis = window;
}

// Polyfill for setImmediate and clearImmediate
if (typeof setImmediate === 'undefined') {
  (globalThis as any).setImmediate = function(callback: Function, ...args: any[]) {
    return setTimeout(() => callback(...args), 0);
  };
}

if (typeof clearImmediate === 'undefined') {
  (globalThis as any).clearImmediate = function(id: any) {
    return clearTimeout(id);
  };
}

// Ensure timer functions are properly bound to globalThis
if (typeof setTimeout !== 'undefined') {
  (globalThis as any).setTimeout = setTimeout.bind(globalThis);
}

if (typeof clearTimeout !== 'undefined') {
  (globalThis as any).clearTimeout = clearTimeout.bind(globalThis);
}

if (typeof setInterval !== 'undefined') {
  (globalThis as any).setInterval = setInterval.bind(globalThis);
}

if (typeof clearInterval !== 'undefined') {
  (globalThis as any).clearInterval = clearInterval.bind(globalThis);
}

// Mock for TensorFlow.js chained ops
// This is used as a fallback when the actual module fails to load
export default {
  // Empty implementation that does nothing
  // This prevents errors when the real module can't be loaded
};

// Ensure TextEncoder is available
if (typeof TextEncoder === 'undefined') {
  console.warn('TextEncoder not available in this browser');
}

// Handle potential issues with fetch API
if (typeof fetch === 'undefined') {
  console.warn('Fetch API not available in this browser');
}

// Ensure Promise.allSettled is available
if (typeof Promise.allSettled !== 'function') {
  Promise.allSettled = function(promises: Promise<any>[]) {
    return Promise.all(
      promises.map(p => 
        p
          .then(value => ({ status: 'fulfilled', value }))
          .catch(reason => ({ status: 'rejected', reason }))
      )
    );
  };
}

// Ensure global error handling for asynchronous errors
window.addEventListener('unhandledrejection', event => {
  console.warn('Unhandled promise rejection:', event.reason);
  // Prevent the default browser behavior (console error)
  event.preventDefault();
});