import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  adresse: string;

  @Prop()
  age: number;

  @Prop()
  password: string;

  // Ajouter la propriété de rôle
  @Prop()
  role: string; // Vous pouvez définir le type de rôle selon vos besoins

}

export const UserSchema = SchemaFactory.createForClass(User);
