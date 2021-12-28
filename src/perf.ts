import { getFirebaseContext } from './helpers';
import { getPerformance, trace } from '@firebase/performance';
import type { PerformanceTrace } from '@firebase/performance';

export function startTrace(name :string) :PerformanceTrace {
    const firebaseApp = getFirebaseContext();
    const perf = getPerformance(firebaseApp);
    
    const trhandler = trace(perf, name);
    trhandler.start();
    console.log("Just started performance", name);
    return trhandler;
}

export function stopTrace(trace :PerformanceTrace) {
    try {
        trace.stop();
    } catch (_e) {
        // Ignore it cause a stopped trace may end up here again
    }
}