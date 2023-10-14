import React, { useEffect, useState } from 'react';
import BetsInterface from '@/interfaces/bets.interface';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';
import View01 from '@/components/partials/dashboard/View01';

const RecentBets = () => {
  const [bets, setBets] = useState<BetsInterface[]>([]);
  const [showMoreBets, setShowMoreBets] = useState(false);

  useEffect(() => {
    Http.axios
      .get(endpoints.BETS)
      .then(response => {
        const {
          data: { data },
        } = response;
        setBets(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <div className="flex flex-col gap-5 mx-3">
      <div className="flex justify-between flex-row">
        <h2 className="font-sans"> Recent Bets</h2>
        <button
          type="button"
          className="font-sans"
          onClick={() => {
            setShowMoreBets(i => !i);
          }}
        >
          See {showMoreBets ? 'Less' : 'All'}
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {bets
          .filter((value, index) => index < (showMoreBets ? bets.length : 4))
          .map(each => {
            return (
              <React.Fragment key={each._id}>
                <View01 bet={each} />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default RecentBets;
