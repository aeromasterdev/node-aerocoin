var fs = require('fs'),
	events = require('events');

var config = {
	rpchost: "127.0.0.1",
	rpcport: 27715,
	rpcuser: "miner1",
	rpcpassword: "miner1"
};
ca = fs.readFileSync('./test/test.crt')
options = {
	host: config.rpchost,
	port: config.rpcport,
	user: config.rpcuser,
	pass: config.rpcpassword,
	passphrasecallback: function () {
		return "passphrasecallback";
	},
	https: true,
	ca: ca
};
var aerocoin = require('../lib/aerocoin')(options);

exports.get = function (test) {
	var options_keys = Object.keys(options);

	var num_propt = Object.keys(options_keys).length;
	test.expect(num_propt);


	if (options.length < config.length) {
		throw new Error('not all config options being used');
		test.done();
	}

	var idx = 0;
	for (var propt in options) {
		test.deepEqual(aerocoin.get('' + options_keys[idx]), options['' + propt]);
		idx++;
	}

	test.done();
}
exports.set = function (test) {

	var new_options = {
		host: '133.7.7.7',
		port: 7142,
		user: 'new_1337_^*)()',
		pass: '*&@#cra$%zy@',
		passphrasecallback: function () {
			return 1 + 1;
		},
		https: false,
		ca: 'nothing here'
	};
	var options_keys = Object.keys(new_options);

	var num_propt = Object.keys(new_options).length;
	test.expect(num_propt);

	if (new_options.length < config.length) {
		throw new Error('not all config options being used');
		test.done();
	}

	var idx = 0;
	for (var propt in new_options) {
		aerocoin.set('' + options_keys[idx], new_options['' + options_keys[idx]]);
		test.deepEqual(aerocoin.get('' + options_keys[idx]), new_options['' + propt]);
		idx++;
	}
	test.done();
}


// NOTE:
// 			All the code below has been commented out as
// 			not sure if account name is the same as the user name or not

/*
 /* BEFORE RUNNING read below:
 * Either run aerocoind directly or run aerocoin-qt with the -server
 * command line option. Make sure you have a ~/.aerocoin/aerocoin.conf
 * with rpcuser and rpcpassword config values filled out. Note that
 * newer versions of aerocoin (1.5 and above) don't allow your
 * rpc username and password to be identical.
 *
 */
/*
 exports.commands_noAuth = {
 //NOTE: Before running the getBalance test add some testAERO to your wallet here: http://testCCN.lionservers.de/
 // 			or add "gen=1" to the bottom of your aerocoin.conf file
 getBalance: function(test){
 var curr_balance;
 aerocoin.getBalance(function(err, balance) {
 test.ifError(err);
 if (err) {
 console.error('Failed to fetch balance', err.message);
 }else {
 console.log('CCN balance is', balance);
 }
 test.done();
 });
 },
 getBalance: function(test){

 },

 getGenerate: function(test){
 test.expect(2);
 aerocoin.setGenerate(true,1);
 test.equal(aerocoin.getGenerate(), true);

 aerocoin.setGenerate(false,1);
 test.equal(aerocoin.getGenerate(), false);
 test.done();
 },
 getreceived_: function(test){
 var amount= 0.0001;
 //aerocoin.setAccount()
 sendfrom("testnet_user", aerocoin.getaccountaddress('testnet_user'),amount, function(err,addr){
 test.equal(getreceivedbyaccount('testnet_user', amount);
 test.equal( getreceivedbyaddress( aerocoin.getaccountaddress('testnet_user') ), amount);
 test.done();

 });



 }


 }

 //all api commands that need .auth()
 exports.commands_Auth = {

 setUp: function () {
 aerocoin.auth('testnet_user', 'testnet_pass');
 }


 }
 */