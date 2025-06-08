import { Test, TestingModule } from "@nestjs/testing";
import { PhimmoiController } from "./phimmoi.controller";
import { PhimmoiService } from "./phimmoi.service";

describe("PhimmoiController", () => {
  let controller: PhimmoiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhimmoiController],
      providers: [PhimmoiService],
    }).compile();

    controller = module.get<PhimmoiController>(PhimmoiController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
