import map from 'lodash/map';
import database from '../models';

class QuestionTagService {
  static async createQuestionTag(newQuestionTag) {
    return database.QuestionTag.create(newQuestionTag)
  }

  static async createQuestionTags(newQuestionId, newQuestionTags) {
    const newQuestionTagsData = await map(newQuestionTags, async questionTag => {
      const newQuestionTagData = {
        QuestionId: newQuestionId,
        TagId: Number(questionTag),
      };
      const newQuestionTag = await QuestionTagService.createQuestionTag(
        newQuestionTagData,
      );
      return newQuestionTag
    });
    return Promise.all(newQuestionTagsData);
  }
}

export default QuestionTagService;
