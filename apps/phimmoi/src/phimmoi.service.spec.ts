import { Test, TestingModule } from '@nestjs/testing';
import { PhimmoiService } from './phimmoi.service';

describe('PhimmoiService', () => {
  let service: PhimmoiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhimmoiService],
    }).compile();

    service = module.get<PhimmoiService>(PhimmoiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
