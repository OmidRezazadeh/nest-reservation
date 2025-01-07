import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { User } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Specifies the entity this subscriber is listening to.
   */
  listenTo() {
    return User;
  }

  /**
   * Called after a user entity is inserted into the database.
   */
  afterInsert(event: InsertEvent<User>): void {
    console.log('AFTER INSERT: A new user has been inserted.');
    console.log('Inserted entity:', event.entity.email);
  }

  private sendWelcomeEmail(email: string): void {
    console.log(`Sending welcome email to ${email}...`);
   
  }
}
