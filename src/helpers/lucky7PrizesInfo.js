/* eslint-disable max-len */
import orderBy from 'lodash.orderby';
import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);

const lucky7PrizesInfo = (state) => {
  let lucky7GameInfo = orderBy(state.lucky7GameInfo, 'difference', 'asc');
  let prizeCounter = 0;
  lucky7GameInfo.forEach((row, index) => {
    if (row.difference !== 0) {
      const currentPrize = String((parseFloat(state.web3.contractBalance * 0.7 * (7 - prizeCounter), 10)) / 28);
      lucky7GameInfo[index].prize = `${web3.utils.fromWei(currentPrize, 'ether')} ETH`;
      prizeCounter += 1;
    } else {
      lucky7GameInfo[index].prize = '0 ETH';
    }
  });
  lucky7GameInfo = orderBy(lucky7GameInfo, 'number', 'asc');
  return lucky7GameInfo;
};

export default lucky7PrizesInfo;
