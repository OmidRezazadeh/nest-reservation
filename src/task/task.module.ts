import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from '../task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    ScheduleModule.forRoot(), // Ensure the ScheduleModule is imported
    forwardRef(() => ProductsModule), // Handle circular dependency
  ],
  providers: [TaskService],
  exports: [TaskService], 
})
export class TaskModule {}
