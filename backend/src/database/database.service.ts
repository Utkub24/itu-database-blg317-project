import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
  }

  async query(query: string, params: any[] = []): Promise<any> {
    const client = await this.pool.connect();
    console.log(`log: running query '${query}' with params '${params}'`);
    try {
      return await client.query(query, params);
    }
    finally {
      client.release();
    }
  }
}
