import { NextApiHandler } from 'next';
import Cors from 'cors';
import { execApi, loadApp } from '../../../src/server/data';
import { NodeId, StudioApiResult } from '../../../src/types';
import initMiddleware from '../../../src/initMiddleware';
import * as studioDom from '../../../src/studioDom';

// Initialize the cors middleware
const cors = initMiddleware<any>(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    // TODO: make this configurable
    origin: '*',
  }),
);

export default (async (req, res) => {
  await cors(req, res);
  const apiNodeId = req.query.queryId as NodeId;
  const dom = await loadApp();
  const api = studioDom.getNode(dom, apiNodeId);
  studioDom.assertIsApi(api);
  res.json(await execApi(api));
}) as NextApiHandler<StudioApiResult<any>>;
