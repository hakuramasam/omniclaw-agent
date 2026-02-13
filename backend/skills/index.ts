import * as webResearch from "./webResearch";
import * as codeWriter from "./codeWriter";
import * as moltbook from "./moltbook";
import * as openclaw from "./openclaw";

export const skills: any = {
  web_research: webResearch.execute,
  write_code: codeWriter.execute,
  post_moltbook: moltbook.execute,
  post_openclaw: openclaw.execute
};
