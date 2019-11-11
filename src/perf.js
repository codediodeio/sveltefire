import { assertApp } from './helpers';

export function startTrace(name) {
    const perf = assertApp('performance');
    const trace = perf.trace(name);
    trace.start();
    return trace;
  }
  
  export async function stopTrace(trace) {
    if (trace.state === 2) {
      trace.stop();
    }
  
    return null;
  }
  
  
  