import map from 'lodash/map';
import database from '../models';

class QuestionTagService {
  static async createQuestionTag(newQuestionTag) {
    return database.QuestionTag.create(newQuestionTag)
  }

  static async createQuestionTags(newQuestionId, newQuestionTags) {
    console.info('createQuestionTags111', newQuestionId, newQuestionTags);
    const newQuestionTagsData = await map(newQuestionTags, async questionTag => {
      const newQuestionTagData = {
        QuestionId: newQuestionId,
        TagId: Number(questionTag),
      };
      console.info('createQuestionTags222', newQuestionId, questionTag);
      const newQuestionTag = await QuestionTagService.createQuestionTag(
        newQuestionTagData,
      );
      console.info(newQuestionTag);
      return newQuestionTag
    });
    console.info('createQuestionTags333', newQuestionTagsData);
    return Promise.all(newQuestionTagsData);
  }
}

export default QuestionTagService;
