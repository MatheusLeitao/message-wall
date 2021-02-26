import { Injectable } from '@nestjs/common';
import RepoService from './repo.service';

@Injectable()
export class AppService {

  constructor(private readonly repoService: RepoService) {

  }

  async getHello(): Promise<string> { // querying database
    return `Total users are ${await this.repoService.userRepo.count()}`;
  }
}