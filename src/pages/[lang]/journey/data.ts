import journeyImages from '../../../assets/images/journey'

export function getStations(stations: { DATE: string, EVENT: string, DESCRIPTION: string}[]) {
    return stations.map((station, idx) => (
        {
            date: station.DATE,
            event: station.EVENT,
            description: station.DESCRIPTION,
            image: journeyImages[idx]
        }
    ))
}
