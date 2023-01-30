export interface ReportStats {
  /** Format: int64 */
  elapsed_time?: number;
  /** Format: int64 */
  time_to_result?: number;
  /**
   * Format: int64
   * @deprecated
   */
  lines_per_second?: number;
}
export interface Revision {
  /** Format: uuid */
  id?: string;
  sha?: string;
  short_sha?: string;
  html_url?: string;
  comment?: string;
  /** Format: date-time */
  date_committed?: string;
  /** Format: date-time */
  date_committed_raw?: string;
  committer?: string;
  author?: string;
  is_scanned?: boolean;
  last_scan?: ScanLite;
  date_committed_description?: string;
  avatar?: string;
}
export interface Scan {
  /** Format: uuid */
  id?: string;
  /** @enum {string} */
  type?: 'FULL' | 'QUICK' | 'AUTO';
  html_url?: string;
  /** Format: date-time */
  enqueued_date?: string;
  /** Format: date-time */
  completed_date?: string;
  stats?: ReportStats;
  /** @enum {string} */
  triggering_event?: 'MANUAL' | 'WEBHOOK' | 'SCHEDULED' | 'MERGE' | 'PR_TRACKED' | 'MIGRATION' | 'BASELINE';
  /** @enum {string} */
  status?: 'QUEUED' | 'PROCESSING' | 'READY' | 'ERROR';
  /** @enum {string} */
  visibility?: 'ACCESSIBLE' | 'HARD_LOCK' | 'PAY_PER_SCAN' | 'DEMO';
  /** @enum {string} */
  result?: 'PASSED' | 'PASSED_WITH_WARNINGS' | 'NOT_PASSED';
  /** @enum {string} */
  status_check?: 'PENDING' | 'PASSED' | 'NOT_PASSED' | 'ERROR';
  obsolete?: boolean;
  /** Format: int64 */
  problems?: number;
  problems_by_severity?: { [key: string]: number };
  revision?: Revision;
  metrics?: ScanMetrics;
  scan_policies?: ScanPolicyLite[];
  default_scan_policy_id?: string;
  sarif_url?: string;
  task?: TaskLite;
  /** @enum {string} */
  status_check_issue_behavior?: 'ALL' | 'REFERENCE_DATE';
  /** Format: date-time */
  status_check_issue_reference_date?: string;
}
export interface ScanLite {
  /** Format: uuid */
  id?: string;
  /** Format: date-time */
  completed_date?: string;
  /** Format: int64 */
  problems?: number;
  problems_by_severity?: { [key: string]: number };
  html_url?: string;
  obsolete?: boolean;
  /** @enum {string} */
  status_check?: 'PENDING' | 'PASSED' | 'NOT_PASSED' | 'ERROR';
  /** @enum {string} */
  result?: 'PASSED' | 'PASSED_WITH_WARNINGS' | 'NOT_PASSED';
  /** Format: int32 */
  score?: number;
  scan_policies?: ScanPolicyLite[];
  global_scan_result_message?: string;
  /** @enum {string} */
  status?: 'QUEUED' | 'PROCESSING' | 'READY' | 'ERROR';
  task?: TaskLite;
}
export interface ScanMetrics {
  /** Format: int32 */
  score?: number;
  /** Format: double */
  remediation_effort?: number;
  remediation_effort_by_severity?: { [key: string]: number };
  /** Format: int64 */
  violation_count?: number;
  violation_count_by_severity?: { [key: string]: number };
  /** Format: double */
  defect_density?: number;
  /** Format: double */
  accumulation_rate?: number;
  /** Format: double */
  capacity_leakage?: number;
  /** Format: double */
  code_to_config_ratio?: number;
  /** Format: int64 */
  lines_of_code?: number;
  /** Format: double */
  technical_debt_ratio?: number;
}
export interface ScanPolicyLite {
  /** Format: uuid */
  id?: string;
  title?: string;
  description?: string;
  html_url?: string;
  /** Format: int64 */
  problems?: number;
  problems_by_severity?: { [key: string]: number };
  score?: number;
  /** Format: double */
  remediation_effort?: number;
  /** Format: double */
  defect_density?: number;
  /** @enum {string} */
  result?: 'PASSED' | 'PASSED_WITH_WARNINGS' | 'NOT_PASSED';
  /** @enum {string} */
  status_check?: 'PENDING' | 'PASSED' | 'NOT_PASSED' | 'ERROR';
  sarif_url?: string;
  /** @enum {string} */
  issue_details?: 'AVAILABLE' | 'PAYWALL' | 'UNAVAILABLE';
}
export interface TaskLite {
  /** Format: uuid */
  id?: string;
  /** @enum {string} */
  status?: 'FUTURE' | 'THROTTLED' | 'ACCEPTED' | 'PROCESSING' | 'PROCESSED';
  /** @enum {string} */
  outcome?: 'SUCCESS' | 'ERROR' | 'PENDING' | 'CANCELLED' | 'ABORTED' | 'INTERRUPTED';
  cancellation_requested?: boolean;
}
