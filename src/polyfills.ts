// Polyfills and global definitions for browser compatibility

// TensorFlow.js specific polyfills and fixes
// This helps prevent the "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops" error
if (typeof window !== 'undefined') {
  // Create a mock for problematic TensorFlow imports
  window.registerOps = () => {
    console.log('Mock registerOps called');
    return Promise.resolve();
  };
  
  // Add to module cache to prevent further import attempts
  // This is a workaround for the module resolution error
  const moduleCache = (window as any).__tfjs_chained_ops_resolved = true;
}

// Ensure globalThis is defined for older browsers
if (typeof globalThis === 'undefined') {
  (window as any).globalThis = window;
}

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

export {};