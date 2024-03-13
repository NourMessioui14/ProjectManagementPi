import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { User, UserDocument } from 'src/models/user.models';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    create(body: UserDto) {
        return this.userModel.create(body);
    }

    findAll() {
        return this.userModel.find();
    }

    findOne(id: string) {
        return this.userModel.findOne({ _id: id });
    }

    update(id: string, body: UserDto) {
        return this.userModel.findByIdAndUpdate(
            { _id: id },
            { $set: body },
            { new: true }
        );
    }

    delete(id: string) {
        return this.userModel.deleteMany({ _id: id });
    }
}
