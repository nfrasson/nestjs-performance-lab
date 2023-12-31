import cluster from "cluster";
import { Injectable, Logger } from "@nestjs/common";

const numCPUs = Number(process.env.CLUSTER_WORKERS) || 1;

@Injectable()
export class AppClusterService {
  private static readonly logger = new Logger(AppClusterService.name);

  static clusterize(callback: Function): void {
    if (cluster.isPrimary) {
      this.logger.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on("exit", (worker, code, signal) => {
        this.logger.error(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      this.logger.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
