/**
 * @param PronounManager: The main object to handle the discord ids-pronouns map aswell as the queue and reference map of pronouns
 * Thank you to Pylix (492949202121261067 / pylixフユ#8636) for their @arg { Aliucord } PronounDB plugin.
 * Without it, it would've been significantly harder to figure out how to do this.
 */
export default {
    /**
     * @param { [key: string]: string } map: The object containing @var { Discord } IDs as the key and @var { Shorthand } pronoun as the value
     */
    map: {} as { [key: string]: string },

    /**
     * @param {any[]} queue: A queue of @var { Discord } IDs which still need fetching and storing.
     */
    queue: [] as any[],

    /**
     * @param {boolean} fetching: Whether the main @func updateQueuedPronouns handler is currently fetching pronouns.
     */
    fetching: false as boolean,

    /**
     * @param {Record<string, string>} referenceMap: The map from @var {shorthand} pronouns to @var {full} pronouns
     */
    referenceMap: {
        hh: "he/him",
        hi: "he/it",
        hs: "he/she",
        ht: "he/they",
        ih: "it/him",
        ii: "it/its",
        is: "it/she",
        it: "it/they",
        shh: "she/he",
        sh: "she/her",
        si: "she/it",
        st: "she/they",
        th: "they/he",
        ti: "they/it",
        ts: "they/she",
        tt: "they/them",
        any: "any",
        other: "other",
        ask: "ask",
        avoid: "avoid, use name",
        unspecified: "unspecified"
    } as Record<string, string>,

    /**
     * Fetches 49 unique @var { Discord } IDs' Pronouns from the PronounDB database at a time and set them to the map.
     * @returns {Promise<void>}
     */
    async updateQueuedPronouns(): Promise<void> {
        /**
         * Return early if the @arg queue is empty or if currently @arg fetching (function will be recalled @arg recusively at the end to clean up anyway)
         */
        if (this.queue.length <= 0 || this.fetching) return;

        /**
         * Get the first @arg {49} ids, removing them from the queue in the process
         */
        const ids = this.queue.splice(0, 49);

        /**
         * Gets a new id from the top of the @arg queue stack until you get one which is not in the @arg map already (so @arg unique and is actually worth fetching/hasn't been fetched yet)
         * @param id: The id of the user to fetch 
         * @returns {string} id/newId
         */
        const greedilyGetNewID = (id: string): string => {
            if (this.queue.length <= 0) return id;
            if (this.map[id]) return greedilyGetNewID(this.queue.shift())
            return id;
        }

        /**
         * For each @arg id, greedily get a new @arg unique id which will return either the same @arg id or a new one depending on if it is @arg unique or not.
         */
        for (const id of ids) {
            if (this.map[id]) ids[id] = greedilyGetNewID(id)
        }

        /**
         * Set @arg fetching to true. Any new instances of this function called will @return early.
         */
        this.fetching = true;

        /**
         * Fetch the @arg unfiltered list of @arg pronouns with the @arg ids placed into the template literal string.
         */
        const unfilteredPronounRes = await(
            await fetch(`https://pronoundb.org/api/v2/lookup?platform=discord&ids=${ids.join(",")}`, {
                method: "GET",
                headers: { "Accept": "application/json", "X-PronounDB-Source": "Vendetta" }
            })
        ).json()

        /**
         * Convert v2 result into v1 result
         */
        var convertedPronounRes = new Map<string, string>();
        Object.keys(unfilteredPronounRes).forEach((key: string) => {
            var testIndex = unfilteredPronounRes[key].sets["en"].findIndex((value: string) => ["ask", "any", "avoid", "other"].includes(value));
            var length = unfilteredPronounRes[key].sets["en"].length;
            if (testIndex >= 0) {
                convertedPronounRes.set(key, unfilteredPronounRes[key].sets["en"][testIndex]);
            }
            else if (length == 1)  {
                switch(unfilteredPronounRes[key].sets["en"][0]) {
                    case "she":
                        convertedPronounRes.set(key, "sh");
                        break;
                    case "he":
                        convertedPronounRes.set(key, "hh");
                        break;
                    case "they":
                        convertedPronounRes.set(key, "tt");
                        break;
                    case "it":
                        convertedPronounRes.set(key, "ii");
                        break;
                }
            }
            else if (length == 2) {
                switch(unfilteredPronounRes[key].sets["en"][0]) {
                    case "she":            
                        switch(unfilteredPronounRes[key].sets["en"][1]) {
                            case "he":
                                convertedPronounRes.set(key, "shh");
                                break;
                            case "they":
                                convertedPronounRes.set(key, "st");
                                break;
                            case "it":
                                convertedPronounRes.set(key, "si");
                                break;
                        }
                        break;
                    case "he":
                        switch(unfilteredPronounRes[key].sets["en"][1]) {
                            case "she":
                                convertedPronounRes.set(key, "hs");
                                break;
                            case "they":
                                convertedPronounRes.set(key, "ht");
                                break;
                            case "it":
                                convertedPronounRes.set(key, "hi");
                                break;
                        }
                        break;
                    case "they":
                        switch(unfilteredPronounRes[key].sets["en"][1]) {
                            case "she":
                                convertedPronounRes.set(key, "ts");
                                break;
                            case "he":
                                convertedPronounRes.set(key, "th");
                                break;
                            case "it":
                                convertedPronounRes.set(key, "ti");
                                break;
                        }
                        break;
                    case "it":
                        switch(unfilteredPronounRes[key].sets["en"][1]) {
                            case "she":
                                convertedPronounRes.set(key, "is");
                                break;
                            case "he":
                                convertedPronounRes.set(key, "ih");
                                break;
                            case "they":
                                convertedPronounRes.set(key, "it");
                                break;
                        }
                        break;
                }
            }
        });
        /**
         * @filter each pronoun to be only @arg ids which are numbers
         */
        const filteredPronounRes = Object.fromEntries(
            Object
                .entries(convertedPronounRes)
                .filter(([key, _]) => !isNaN(+key)));
        Object.assign(this.map, filteredPronounRes)

        /**
         * Set @arg fetching back to false, so any new instances will be able to @continue past the first if check.
         */
        this.fetching = false;
        
        /**
         * Recall the function @recursively if any items are still in the queue
         */
        if (this.queue.length > 0) this.updateQueuedPronouns();
    }
}
