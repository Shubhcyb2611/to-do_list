import { JwtService, Scopes } from "@/application/services";
import { UserService } from "@/application/services/UserService";
import { Request, Response } from "express";

export class UserController {
  private userService: UserService;
  private jwtService: JwtService;
  constructor(userService: UserService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }
  signupUser = async (req: Request, res: Response) => {
    const user = await this.userService.signUp(req.body);
    return res.status(201).json(user);
  };

  loginUser = async (req: Request, res: Response) => {
    const user = await this.userService.login(req.body);
    return res.status(200).json(user);
  };

  refreshAccessToken = async (req: Request, res: Response) => {
    const accessToken = this.userService.exchangeRefreshTokenForAccessToken(
      req.body.refreshToken
    );
    res.json({ accessToken });
  };

  getUserDetails = async (req: Request, res: Response) => {
    const user = await this.userService.getUserById(Number(req.params.id));
    return res.status(200).json(user);
  };

  updateUserById = async (req: Request, res: Response) => {
    const user = await this.userService.updateUser(
      Number(req.params.id),
      req.body
    );
    return res.status(202).json(user);
  };

  deleteUserById = async (req: Request, res: Response) => {
    const user = await this.userService.deleteUser(Number(req.params.id));
    return res.status(204).end();
  };

  getUserInfoByGoogle = async (req: Request, res: Response) => {
    const decode = await this.jwtService.decodeGoogleToken(req.body.token);
    res.json(decode);
  };
}
