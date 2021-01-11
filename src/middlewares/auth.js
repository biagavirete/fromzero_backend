import { verify } from 'jsonwebtoken';

export default async(request, response, next) => {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(401).json({ error: 'User not authorized!' });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = verify(token, "73b3a174d1fa3fd0ee9ebc7808efdb70");
        console.log(decoded);

        return next();
    } catch(err) {
        return response.status(401).json({ error: 'Invalid JWT Token'});
    }
}