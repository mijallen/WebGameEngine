// -- UTILITY -- //

class Utility {
    public static getMapKeysArray<Key, Value>(map: Map<Key, Value>): Key[] {
        let keyArray: Key[] = [];

        for (
            let keyCollectionIterator = map.keys(),
            keyIterator = keyCollectionIterator.next();
            keyIterator.done == false;
            keyIterator = keyCollectionIterator.next()
        ) {
            keyArray.push(keyIterator.value);
        }

        return keyArray;
    }

    public static getSetKeysArray<Key>(set: Set<Key>): Key[] {
        let keyArray: Key[] = [];

        for (
            let keyCollectionIterator = set.keys(),
            keyIterator = keyCollectionIterator.next();
            keyIterator.done == false;
            keyIterator = keyCollectionIterator.next()
        ) {
            keyArray.push(keyIterator.value);
        }

        return keyArray;
    }
}
