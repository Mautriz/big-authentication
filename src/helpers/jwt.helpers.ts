import { JwtPayload, JwtRefreshPayload } from '../controllers/user/model/jwt.payload';
import * as jwt from 'jsonwebtoken';
import { BpConfig } from '../configuration/config/config.service';

export function jwtBpEncode(payload: JwtPayload): string {
	const { secretKey, algorithm, accessDuration } = BpConfig.get().jwt;
	return jwt.sign(payload, secretKey, { algorithm, expiresIn: accessDuration });
}

export function jwtRefreshBpEncode(payload: JwtRefreshPayload): string {
	const { refreshSecretKey, algorithm, refreshDuration } = BpConfig.get().jwt;
	return jwt.sign(payload, refreshSecretKey, { algorithm, expiresIn: refreshDuration });
}

export function jwtBpVerify(access_token: string): JwtPayload | undefined {
	const { secretKey, algorithm } = BpConfig.get().jwt;
	return jwt.verify(access_token, secretKey, {
		algorithms: [algorithm],
	}) as JwtPayload;
}

export function jwtRefreshBpVerify(refresh_token: string): JwtRefreshPayload | undefined {
	const { refreshSecretKey, algorithm } = BpConfig.get().jwt;
	return jwt.verify(refresh_token, refreshSecretKey, {
		algorithms: [algorithm],
	}) as JwtPayload;
}
