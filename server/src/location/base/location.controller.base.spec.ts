import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { LocationController } from "../location.controller";
import { LocationService } from "../location.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  addressLine_1: "exampleAddressLine_1",
  addressLine_2: "exampleAddressLine_2",
  city: "exampleCity",
  createdAt: new Date(),
  friday: new Date(),
  id: "exampleId",
  monday: new Date(),
  saturday: new Date(),
  state: "exampleState",
  sunday: new Date(),
  thursday: new Date(),
  tuesday: new Date(),
  updatedAt: new Date(),
  wednesday: new Date(),
  zip: "exampleZip",
};
const CREATE_RESULT = {
  addressLine_1: "exampleAddressLine_1",
  addressLine_2: "exampleAddressLine_2",
  city: "exampleCity",
  createdAt: new Date(),
  friday: new Date(),
  id: "exampleId",
  monday: new Date(),
  saturday: new Date(),
  state: "exampleState",
  sunday: new Date(),
  thursday: new Date(),
  tuesday: new Date(),
  updatedAt: new Date(),
  wednesday: new Date(),
  zip: "exampleZip",
};
const FIND_MANY_RESULT = [
  {
    addressLine_1: "exampleAddressLine_1",
    addressLine_2: "exampleAddressLine_2",
    city: "exampleCity",
    createdAt: new Date(),
    friday: new Date(),
    id: "exampleId",
    monday: new Date(),
    saturday: new Date(),
    state: "exampleState",
    sunday: new Date(),
    thursday: new Date(),
    tuesday: new Date(),
    updatedAt: new Date(),
    wednesday: new Date(),
    zip: "exampleZip",
  },
];
const FIND_ONE_RESULT = {
  addressLine_1: "exampleAddressLine_1",
  addressLine_2: "exampleAddressLine_2",
  city: "exampleCity",
  createdAt: new Date(),
  friday: new Date(),
  id: "exampleId",
  monday: new Date(),
  saturday: new Date(),
  state: "exampleState",
  sunday: new Date(),
  thursday: new Date(),
  tuesday: new Date(),
  updatedAt: new Date(),
  wednesday: new Date(),
  zip: "exampleZip",
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Location", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: LocationService,
          useValue: service,
        },
      ],
      controllers: [LocationController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /locations", async () => {
    await request(app.getHttpServer())
      .post("/locations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        friday: CREATE_RESULT.friday.toISOString(),
        monday: CREATE_RESULT.monday.toISOString(),
        saturday: CREATE_RESULT.saturday.toISOString(),
        sunday: CREATE_RESULT.sunday.toISOString(),
        thursday: CREATE_RESULT.thursday.toISOString(),
        tuesday: CREATE_RESULT.tuesday.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        wednesday: CREATE_RESULT.wednesday.toISOString(),
      });
  });

  test("GET /locations", async () => {
    await request(app.getHttpServer())
      .get("/locations")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          friday: FIND_MANY_RESULT[0].friday.toISOString(),
          monday: FIND_MANY_RESULT[0].monday.toISOString(),
          saturday: FIND_MANY_RESULT[0].saturday.toISOString(),
          sunday: FIND_MANY_RESULT[0].sunday.toISOString(),
          thursday: FIND_MANY_RESULT[0].thursday.toISOString(),
          tuesday: FIND_MANY_RESULT[0].tuesday.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
          wednesday: FIND_MANY_RESULT[0].wednesday.toISOString(),
        },
      ]);
  });

  test("GET /locations/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/locations"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /locations/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/locations"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        friday: FIND_ONE_RESULT.friday.toISOString(),
        monday: FIND_ONE_RESULT.monday.toISOString(),
        saturday: FIND_ONE_RESULT.saturday.toISOString(),
        sunday: FIND_ONE_RESULT.sunday.toISOString(),
        thursday: FIND_ONE_RESULT.thursday.toISOString(),
        tuesday: FIND_ONE_RESULT.tuesday.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
        wednesday: FIND_ONE_RESULT.wednesday.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
