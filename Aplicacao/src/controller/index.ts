export class Controller{
    async getRelatorio(request: Request, response: Response): Promise<Interface>{
        const {filters} = request.params;

        //aqui será chamada a useCase função{filters}
    }
}