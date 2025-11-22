import { twitterClient } from './client.js';
import { SETTINGS } from '../config/settings.js';
import { handleMention } from '../handler/mentionHandler.js';
import { log } from '../utils/logger.js';

export async function setupStream() {
  try {
    log('Setting up Twitter stream with OAuth 1.0a client...');
    log('Stream rule:', SETTINGS.STREAM_RULE);
    
    await twitterClient.v2.updateStreamRules({
      delete: { ids: await getAllRuleIds() },
      add: [{ value: SETTINGS.STREAM_RULE, tag: 'mentions' }]
    });

    log('Creating search stream...');
    const stream = await twitterClient.v2.searchStream({
      'tweet.fields': ['author_id', 'text', 'in_reply_to_user_id']
    });

    log('Stream started, listening for mentions...');

    stream.on('data', handleMention);
    stream.on('error', (error) => {
      log('Stream error:', error);
      setTimeout(setupStream, 5000);
    });

    return stream;
  } catch (error) {
    log('Failed to setup stream:', error);
    setTimeout(setupStream, 10000);
  }
}

async function getAllRuleIds() {
  try {
    const rules = await twitterClient.v2.streamRules();
    return rules.data?.map(rule => rule.id) || [];
  } catch {
    return [];
  }
}