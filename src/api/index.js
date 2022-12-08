import WorkbenchApi from "@/api/workbench"
import SystemApi from "@/api/system"

const api = {
  ...WorkbenchApi,
  ...SystemApi
}

export default api
