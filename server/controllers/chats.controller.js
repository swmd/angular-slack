import Message from '../models/message';
import logger from '../core/logger/app-logger';

const controller = {};

controller.getLast7Days = async (req, res) => {
  try {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    const messages = await Message.find({
      time: { $gt: date.getTime() },
    }).populate('user');
    
    const data = messages.map(msg => ({
      ...msg.toObject(),
      userId: msg.$__.populated.user.value,
      user: msg.user
    }));

    res.send(data);
  } catch (err) {
    logger.error(`Error in getting cars- ${err}`);
    res.send('Got error in getAll');
  }
};

export default controller;
