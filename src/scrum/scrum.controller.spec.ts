import { Test, TestingModule } from '@nestjs/testing';
import { ScrumController } from './scrum.controller';

describe('ScrumController', () => {
  let controller: ScrumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrumController],
    }).compile();

    controller = module.get<ScrumController>(ScrumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
