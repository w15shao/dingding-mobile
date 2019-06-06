

var wechat = {};
(function (share) {
	share.currentIndex = 0;
	share.localIds = [];
	share.showImg = function (imgs, index) {
		wx.previewImage({
			current: index, // 当前显示图片的http链接
			urls: imgs // 需要预览的图片http链接列表
		});
	},
		/*
		*上传图片config为图片上传参数
		*/
		share.uploadImageUpgrade = function (config) {

			var me = this;
			wx.chooseImage({
				count: config.count || 1,
				sizeType: 'compressed', // 可以指定是原图还是压缩图，默认二者都有
				success: function (res) {
					var localIds = res.localIds;
					var status = {
						len: localIds.length,
					};
					status.callback = config.callback;
					me.localIds = localIds;
					share.currentIndex = 0;
					if (localIds && localIds.length > 0) {
						setTimeout(function () {
							me.uploadSingle(0, status);

						}, 150);
					} else {
						$.util.alert("请选择一张图片上传");
					}
				}
			});
		},

		share.uploadImage = function (callback) {

			var me = this;
			wx.chooseImage({
				count: 9,
				sizeType: 'compressed', // 可以指定是原图还是压缩图，默认二者都有
				success: function (res) {
					var localIds = res.localIds;
					var status = {
						len: localIds.length,
					};
					status.callback = callback;
					me.localIds = localIds;
					share.currentIndex = 0;
					if (localIds && localIds.length > 0) {
						setTimeout(function () {
							me.uploadSingle(0, status);

						}, 150);
					} else {
						$.util.alert("请选择一张图片上传");
					}
				}
			});
		},
		share.uploadSingle = function (index, status) {
			var me = this;
			if (me.localIds.length > 1) {
				common_base.show_msg({
					content: "正在上传第" + (me.currentIndex + 1) + "张",
					shadeClose: false
				})
				//			$.util.pageLoading.show("正在上传第"+(me.currentIndex+1)+"张");
			} else {

				common_base.show_msg({
					content: "上传中",
					shadeClose: false
				})

				//			$.util.pageLoading.show("上传中");
			}
			wx.uploadImage({
				localId: me.localIds[index], // 需要上传的图片的本地ID，由chooseImage接口获得
				isShowProgressTips: 0, // 默认为1，显示进度提示
				success: function (res) {
					status.index = index;
					share.__upload(res, status, function () {
						if (me.localIds.length > 0) {
							if (me.currentIndex >= me.localIds.length - 1) {
								//							$.util.pageLoading.hide();
								common_base.closeAll();
							}
						} else {
							common_base.closeAll();
						}
						if (me.currentIndex < me.localIds.length - 1) {
							me.uploadSingle(++me.currentIndex, status);
						}
					});
				}
			});
		}
	share.uploadMultImage = function (callback) {

		var me = this;
		wx.chooseImage({
			success: function (res) {
				var localIds = res.localIds;
				var status = {
					len: localIds.length,
				};
				status.callback = callback;
				share.currentIndex = 0;
				me.localIds = localIds;
				if (localIds && localIds.length > 0) {
					setTimeout(function () {
						me.uploadSingle(me.currentIndex, status);
					}, 150);
				} else {
					$.util.alert("请选择一张图片上传");
				}
			}
		});
	}
	share.__upload = function (res, status, uploadCallback) {
		var serverId = res.serverId; // 返回图片的服务器端ID
		var me = this;

		common_base.request({
			url: "ImgUtil/download",
			data: { "media_id": serverId },
			success: function (result) {

				if (result.status == 1) {
					uploadCallback && uploadCallback();
					status.callback && status.callback(result, status);
				} else {
					common_base.show_msg({
						content: result.info,
						time: 2
					});
				}
			}

		});

		//		$.req.get("Upload/uploadToOss.json?customerId="+customerId+"d=" + (+new Date()), {
		//			"mediaId": serverId
		//		}, function(data) {
		//			if (!data.code) {
		//				uploadCallback && uploadCallback();
		//				status.callback && status.callback(data, status);
		//			}
		//		});
	}
	share.scan = function (callback) {
		wx.scanQRCode({
			needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			success: function (res) {
				var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			}
		});
	}
	share.getLocation = function (callback) {

		wx.getLocation({
			type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			success: function (res) {
				alert(res);
				var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				var speed = res.speed; // 速度，以米/每秒计
				var accuracy = res.accuracy; // 位置精度
				// alert(latitude);
				if (typeof (callback) != 'undefined' && typeof (callback) != 'function') {
					callback(latitude, longitude);
				}
			},
			fail: function () {
				alert('sdfsf');
			}
		});

	}
	share.to_location = function (config) {
		wx.ready(function () {
			wx.openLocation({
				latitude: config.lat,
				longitude: config.log,
				name: config.shopname,
				address: '',
				scale: 20,
				infoUrl: ''
			});
		});
	}

	share.init = function (config) {
		//alert(config.title);
		// alert(config.desc);
		// alert(config.link);
		var me = this;
		var pkg = config.pkg;
		var apiList = [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'chooseImage',
			'uploadImage',
			'previewImage',
			'downloadImage',
			'scanQRCode',
			'getLocation',
			'openLocation'
		];
		// alert(config.imgUrl);
		// alert(config.link);
		//alert(pkg.appId);
		wx.config({
			debug: false,
			appId: pkg.appId,
			timestamp: pkg.timestamp,
			nonceStr: pkg.nonceStr,
			signature: pkg.signature,
			jsApiList: apiList
		});

		wx.ready(function () {
			//alert(config.title);
			if (config.title) {
				wx.onMenuShareAppMessage({
					desc: config.desc || "", // 分享描述
					title: config.title || "", // 分享标题
					link: config.link || "", // 分享链接
					imgUrl: config.imgUrl || "", // 分享图标
					success: function (res) {
						//  alert('已分享');
					},
					cancel: function (res) {
						//alert('已取消');
					},
					fail: function (res) {
						//alert(JSON.stringify(res));
					}
				});
				wx.onMenuShareTimeline({
					desc: config.desc || "", // 分享描述
					title: config.title || "", // 分享标题
					link: config.link || "", // 分享链接
					imgUrl: config.imgUrl || "", // 分享图标
					success: function (res) {
						//  alert('已分享');
					},
					cancel: function (res) {
						//alert('已取消');
					},
					fail: function (res) {
						//alert(JSON.stringify(res));
					}
				});
				wx.onMenuShareQQ({
					desc: config.desc || "", // 分享描述
					title: config.title || "", // 分享标题
					link: config.link || "", // 分享链接
					imgUrl: config.imgUrl || "", // 分享图标
					success: function (res) {
						//  alert('已分享');
					},
					cancel: function (res) {
						//alert('已取消');
					},
					fail: function (res) {
						//alert(JSON.stringify(res));
					}
				});
				wx.onMenuShareWeibo({
					desc: config.desc || "", // 分享描述
					title: config.title || "", // 分享标题
					link: config.link || "", // 分享链接
					imgUrl: config.imgUrl || "", // 分享图标
					success: function (res) {
						//  alert('已分享');
					},
					cancel: function (res) {
						//alert('已取消');
					},
					fail: function (res) {
						//alert(JSON.stringify(res));
					}
				});
			}
		});
	}



})(wechat);
export default wechat;
