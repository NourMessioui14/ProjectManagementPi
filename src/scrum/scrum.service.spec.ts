import { Test, TestingModule } from '@nestjs/testing';
import { ScrumService } from './scrum.service';

describe('ScrumService', () => {
  let service: ScrumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrumService],
    }).compile();

    service = module.get<ScrumService>(ScrumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
