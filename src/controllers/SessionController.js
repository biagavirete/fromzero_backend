import { sign } from 'jsonwebtoken';
import User from '../schemas/User';
import { compare } from 'bcryptjs';

class SessionController {
    async create(request, response) {
        const { username, password } = request.body;

        const user = await User.findOne({
            username
        });

        if(!user) {
            return response.status(404).json({error: 'User not found'});
        }

        const matchPassword = await compare(password, user.password);

        if(!matchPassword) {
            return response.status(404).json({error: 'Incorrect password or username'});
        }

        const token = sign({}, "73b3a174d1fa3fd0ee9ebc7808efdb70", {
            subject: new String(user._id),
            expiresIn: '1d'
        });

        return response.json({
            token,
            user,
        });
    }

}

export default new SessionController();