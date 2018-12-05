import { addEntry, getEntries } from "../controllers/levelEntryController";

const routes = (app) => {
    app.route('/level')
    .get(getEntries)
    .post(addEntry)
}

export default routes;