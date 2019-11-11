declare interface setFixedInterval {
  /**
   * Main loop frequency
   * @units Hz
   */
  frequency: number;

  /**
   * Time between callbacks
   * @units milliseconds
   */
  tickInterval: number;

  /**
   * When the duration of the callback to `.workFn` exceeds this time in milliseconds
   * (defaults to 10% of `.tickInterval`) `.warnFn` will be called and passed the total
   * time `.workFn` took, giving an opportunity for the consumer to decrease the
   * amount of work or lower the `.frequency`.
   */
  warnInterval: number;

  /**
   * The function to call during each callback
   */
  workFn: () => void;

  /**
   * The function to call if the time spent executing `.workFn` during each callback
   * @param workTime Time work took
   */
  warnFn: ((workTime: number) => void) | null;

  /**
   * @private
   * Undocumented property
   *
   * Time of next event
   */
  readonly lastTick: number;

  /**
   * @private
   * Undocumented property
   *
   * The internal `NodeJS.Timeout` that is used
   */
  readonly timeout: NodeJS.Timeout | null;

  /**
   * Starts calling the callback.
   * Calling `.start()` on an already running callback will reset the callback's time-alignment to the current time.
   */
  start: () => void;

  /**
   * Stops calls to the callback.
   * Calling `.stop()` on an already stopped object has no effect.
   */
  stop: () => void;

  /**
   * Starts calling the callback for seconds seconds (may be fractional/floating-point) and
   * optionally (if provided) calls completeFn after the callback's last call.
   * Calling `.runFor()` on an already `.start()`'d callback will reset the time-alignment to the current time.
   * Calling `.runFor()` on an already `.runFor()`'ing callback is (currently) unpredictable.
   * 
   * @param seconds Time to run the interval for
   * @param completeFn Function to run when `seconds` elapses
   */
  runFor: (seconds: number, completeFn?: () => void) => void;
}

declare interface Constructor {
  /**
   * Create new instance with `new`
   * 
   * @param frequency The frequency to call `workFn`
   * @param workFn The function to call regularly
   * @param warnFn Function that gets called when `workFn` takes too long to complete
   */
  new (
    frequency: number,
    workFn?: () => void,
    warnFn?: (workTime: number) => void
  ): setFixedInterval;

  /**
   * Let the constructor create the `new` instance for us
   * 
   * @param frequency The frequency to call `workFn`
   * @param workFn The function to call regularly
   * @param warnFn Function that gets called when `workFn` takes too long to complete
   */
  (
    frequency: number,
    workFn?: () => void,
    warnFn?: (workTime: number) => void
  ): setFixedInterval;
}

declare const FixedInterval: Constructor;

export default FixedInterval;
