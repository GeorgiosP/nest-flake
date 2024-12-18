import { SnowflakeCredentialsDto } from './snowflake-credentials.dto';

describe('SnowflakeCredentialsDto', () => {
  it('should be defined', () => {
    expect(new SnowflakeCredentialsDto()).toBeDefined();
  });
});
