type QueueTask = () => Promise<void>;

class IframeQueue {
  private queue: QueueTask[] = [];
  private running = false;

  enqueue(task: QueueTask) {
    this.queue.push(task);
    this.run();
  }

  private async run() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (!task) continue;

      try {
        await task();
      } catch (e) {
        console.error('Iframe task failed:', e);
      }
    }

    this.running = false;
  }
}

export const iframeQueue = new IframeQueue();
