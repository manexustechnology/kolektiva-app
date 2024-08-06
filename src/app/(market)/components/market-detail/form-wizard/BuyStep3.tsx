'use client';

interface BuyStep3Props {
  isAfterMarketTrading: boolean;
}

const BuyStep3: React.FC<BuyStep3Props> = ({ isAfterMarketTrading }) => (
  <div className="flex flex-col gap-6">
    <h2 className="text-2xl font-bold text-zinc-950">Please review co-owner agreement</h2>
    <div className="bg-zinc-100 w-full rounded-lg p-4 ckeditor-content leading-3">
      <p>You must review and agree to the terms below you can receive tokens for this property.</p>
      <br />
      <p>By purchasing a token, you agree to become a co-owner in a property with other owners and acknowledge the following:</p>
      <br />
      <ol style={{ marginLeft: '10px' }}>
        <li>You have read all legal disclaimers and the agreement for this property</li>
        <br />
        <li>You agree to elect Kolektiva Inc. as a representative of the membership with limited powers to the following acts:</li>
        <br />
        <ul style={{ marginLeft: '20px' }}>
          <li>Sign on behalf of the membership during escrow</li>
          <li>Sign manager on behalf of the membership</li>
          <li>Act as a liaison to transfer information between the ownership and the 3rd party property manager</li>
          <li>Distribute rent income pro-rata to each owner&apos;s entitled share</li>
          <li>Carry out the wishes of the membership as determined by the governance program</li>
        </ul>
        <br />
        <li>You understand that you are responsible as a co-owner to vote through the governance program to manage your property when necessary and that voting is mandatory.</li>
        <br />
        <li>Your co-ownership in a given property is in effect when you hold at least 1 property token in that property.</li>
      </ol>
    </div>
  </div>
);

export default BuyStep3;