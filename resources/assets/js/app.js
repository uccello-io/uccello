import './materialize'
import './core/global'

import { Global } from './core/global'
import I18n from './I18n'

import 'sweetalert'
import 'daterangepicker'
import 'nestable2'
import 'jquery-countto'
import 'jstree/src/jstree.search.js'
import 'jstree/src/jstree.sort.js'
// import 'devbridge-autocomplete'

import Pickr from '@simonwep/pickr';


class UccelloApp {
    constructor() {
        this.initGlobal()
        this.initContentHeight()
        this.autoOpenMenu()
        this.initTranslation()
        this.initScrollSpy()
        this.initJsTree()
        this.initSearchBar()
        this.initMenuSizeSwitcher()
        this.initFieldLibraries()

        addEventListener('js.init.field.libraries', event => { // Used in uccello/import package
            this.initFieldLibraries(event.detail.element || null)
        })
    }

    initFieldLibraries(element) {
        if (typeof element === 'undefined') {
            element = $(document);
        }

        this.initDateRangePicker(element)
        this.initColorPicker(element)
        this.initCountTo()

    }

    initGlobal() {
        new Global()
    }

    initContentHeight() {
        $('main .content:first').css('min-height', $(document).height() - $('.navbar-header').height() - $('.navbar-top').height())
    }

    initTranslation() {
        window.I18n = I18n
        window.uctrans = new I18n('uctranslations')
    }

    initScrollSpy() {
        let that = this

        if (that.isMobileSize()) {
            $('.navbar-top nav').removeClass('transparent').removeClass('z-depth-0')
            $('.breadcrumb-container').addClass('z-depth-0')
        }

        $(window).scroll(function() {
            if (!that.isMobileSize() && $(this).scrollTop() > 20) {
                $('.navbar-top nav').removeClass('transparent').removeClass('z-depth-0')
                $('.breadcrumb-container').addClass('z-depth-0')
            } else if (!that.isMobileSize()) {
                $('.navbar-top nav').addClass('transparent').addClass('z-depth-0')
                $('.breadcrumb-container').removeClass('z-depth-0')
            }
        })
    }

    initDateRangePicker(element) {
        var today = uctrans.trans('uccello::default.calendar.ranges.today')
        var month = uctrans.trans('uccello::default.calendar.ranges.month')
        var lastMonth = uctrans.trans('uccello::default.calendar.ranges.last_month')
        var nextMonth = uctrans.trans('uccello::default.calendar.ranges.next_month')
        var quarter = uctrans.trans('uccello::default.calendar.ranges.quarter')
        var lastQuarter = uctrans.trans('uccello::default.calendar.ranges.last_quarter')
        var nextQuarter = uctrans.trans('uccello::default.calendar.ranges.next_quarter')
        var year = uctrans.trans('uccello::default.calendar.ranges.year')
        var lastYear = uctrans.trans('uccello::default.calendar.ranges.last_year')
        var nextYear = uctrans.trans('uccello::default.calendar.ranges.next_year')

        // Date range picker
        $('.date-range-picker', element).each((index, el) => {
            $(el).daterangepicker({
                autoUpdateInput: false,
                locale: this.getDaterangePickerLocale($(el).data('format')),
                showDropdowns: true,
                applyButtonClasses: "waves-effect primary",
                cancelClass: "waves-effect btn-flat",
                alwaysShowCalendars: $(el).data('show-calendars') ? true : false,
                ranges: {
                    [today]: [moment(), moment()],
                    [month]: [moment().startOf('month'), moment().endOf('month')],
                    [lastMonth]: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    [nextMonth]: [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')],
                    [quarter]: [moment().startOf('quarter'), moment().endOf('quarter')],
                    [lastQuarter]: [moment().subtract(1, 'quarter').startOf('quarter'), moment().subtract(1, 'quarter').endOf('quarter')],
                    [nextQuarter]: [moment().add(1, 'quarter').startOf('quarter'), moment().add(1, 'quarter').endOf('quarter')],
                    [year]: [moment().startOf('year'), moment().endOf('year')],
                    [lastYear]: [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
                    [nextYear]: [moment().add(1, 'year').startOf('year'), moment().add(1, 'year').endOf('year')],
                }
            }, function(start, end, label) {
                $(this).change()
            })
            .on('apply.daterangepicker', function(ev, picker) {
                if ($(this).data('range') === true && picker.chosenLabel !== uctrans.trans('uccello::default.calendar.custom')) {
                    $(this).val(picker.chosenLabel)
                } else {
                    $(this).val(picker.startDate.format($(this).data('format')) + ', ' + picker.endDate.format($(this).data('format')))
                }
            })
            .on('cancel.daterangepicker', function(ev, picker) {
                $(this).val('').change()
            })
        })


        // Datetime range picker
        $('.datetime-range-picker', element).each((index, el) => {
            $(el).daterangepicker({
                autoUpdateInput: false,
                timePicker: true,
                timePicker24Hour: true,
                locale: this.getDaterangePickerLocale($(el).data('format')),
                showDropdowns: true,
                applyButtonClasses: "waves-effect primary",
                cancelClass: "waves-effect btn-flat",
            }, function(start, end, label) {
                $(this).change()
            })
            .on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format($(this).data('format')) + ', ' + picker.endDate.format($(this).data('format')))
            })
            .on('cancel.daterangepicker', function(ev, picker) {
                $(this).val('').change()
            })
        })

        // Date picker
        $('.datepicker', element).each((index, el) => {
            $(el).daterangepicker({
                autoUpdateInput: false,
                locale: this.getDaterangePickerLocale($(el).data('format')),
                singleDatePicker: true,
                showDropdowns: true
            })
            .on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format($(this).data('format')))
            })
            .on('keyup', function() {
                let dateStr = $(this).val()
                if (moment(dateStr).isValid()) {
                    let date = moment(dateStr)
                    $(this).data('daterangepicker').setStartDate(date)
                    $(this).data('daterangepicker').setEndDate(date)
                }
            })
        })

        // Datetime picker
        $('.datetimepicker', element).each((index, el) => {
            $(el).daterangepicker({
                autoUpdateInput: false,
                autoApply: true,
                locale: this.getDaterangePickerLocale($('meta[name="datetime-format-js"]').attr("content")),
                singleDatePicker: true,
                timePicker: true,
                timePicker24Hour: true,
                showDropdowns: true,
                applyButtonClasses: "waves-effect primary",
                cancelClass: "waves-effect btn-flat"
            })
            .on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format($(this).data('format')))
                $(this).parents('.input-field:first').find('label').addClass('active')
            })
            .on('cancel.daterangepicker', function(ev, picker) {
                $(this).val('').change()
            })
            .on('keyup', function() {
                let dateStr = $(this).val()
                if (moment(dateStr).isValid()) {
                    let date = moment(dateStr)
                    $(this).data('daterangepicker').setStartDate(date)
                    $(this).data('daterangepicker').setEndDate(date)
                }
            })
        })

        // Month picker
        $('.monthpicker', element).each((index, el) => {
            $(el).daterangepicker({
                autoUpdateInput: false,
                autoApply: true,
                locale: this.getDaterangePickerLocale($(el).data('format')),
                singleDatePicker: true,
                showDropdowns: true
            })
            .on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format('YYYY-MM'))
                $(this).parents('.input-field:first').find('label').addClass('active')
            })
        })

        // Week picker
        $('.weekpicker', element).each((index, el) => {
            $(el).daterangepicker({
                autoUpdateInput: false,
                autoApply: true,
                locale: this.getDaterangePickerLocale($(el).data('format')),
                singleDatePicker: true,
                showWeekNumbers: true,
                showDropdowns: true
            })
            .on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format('YYYY-w'))
                $(this).parents('.input-field:first').find('label').addClass('active')
            })
        })
    }

    getDaterangePickerLocale(format) {
        return {
            format: format,
            separator: uctrans.trans('uccello::default.calendar.separator'),
            applyLabel: uctrans.trans('uccello::default.calendar.apply'),
            cancelLabel: uctrans.trans('uccello::default.calendar.cancel'),
            fromLabel: uctrans.trans('uccello::default.calendar.from'),
            toLabel: uctrans.trans('uccello::default.calendar.to'),
            customRangeLabel: uctrans.trans('uccello::default.calendar.custom'),
            weekLabel: uctrans.trans('uccello::default.calendar.week'),
            daysOfWeek: [
                uctrans.trans('uccello::default.calendar.day.su'),
                uctrans.trans('uccello::default.calendar.day.mo'),
                uctrans.trans('uccello::default.calendar.day.tu'),
                uctrans.trans('uccello::default.calendar.day.we'),
                uctrans.trans('uccello::default.calendar.day.th'),
                uctrans.trans('uccello::default.calendar.day.fr'),
                uctrans.trans('uccello::default.calendar.day.sa'),
            ],
            monthNames: [
                uctrans.trans('uccello::default.calendar.month.january'),
                uctrans.trans('uccello::default.calendar.month.february'),
                uctrans.trans('uccello::default.calendar.month.march'),
                uctrans.trans('uccello::default.calendar.month.april'),
                uctrans.trans('uccello::default.calendar.month.may'),
                uctrans.trans('uccello::default.calendar.month.june'),
                uctrans.trans('uccello::default.calendar.month.july'),
                uctrans.trans('uccello::default.calendar.month.august'),
                uctrans.trans('uccello::default.calendar.month.september'),
                uctrans.trans('uccello::default.calendar.month.october'),
                uctrans.trans('uccello::default.calendar.month.november'),
                uctrans.trans('uccello::default.calendar.month.december'),
            ],
            firstDay: 1,
        }
    }

    initColorPicker(element) {
        if ($('.colorpicker', element).length === 0) {
            return;
        }

        $('.colorpicker', element).each((index, element) => {
            let pickr = Pickr.create({
                el: element,
                theme: 'classic', // or 'monolith', or 'nano'
                default: '#007AD6',

                swatches: [
                    'rgb(244, 67, 54)',
                    'rgb(233, 30, 99)',
                    'rgb(156, 39, 176)',
                    'rgb(103, 58, 183)',
                    'rgb(63, 81, 181)',
                    'rgb(33, 150, 243)',
                    'rgb(3, 169, 244)',
                    'rgb(0, 188, 212)',
                    'rgb(0, 150, 136)',
                    'rgb(76, 175, 80)',
                    'rgb(139, 195, 74)',
                    'rgb(205, 220, 57)',
                    'rgb(255, 235, 59)',
                    'rgb(255, 193, 7)'
                ],

                components: {

                    // Main components
                    preview: true,
                    opacity: true,
                    hue: true,

                    // Input / output Options
                    interaction: {
                        // hex: true,
                        // rgba: true,
                        // hsla: true,
                        // hsva: true,
                        // cmyk: true,
                        input: true,
                        clear: true,
                        save: true
                    }
                },

                strings: {
                    save: uctrans.trans('uccello::default.button.select'),  // Default for save button
                    clear: uctrans.trans('uccello::default.button.clear'), // Default for clear button
                    cancel: uctrans.trans('uccello::default.button.cancel') // Default for cancel button
                }
            })

            // Init
            pickr.on('init', instance => {
                let input = $(instance._root.root).parents('.input-field:first').find('input[type="text"]')

                // Init color
                instance.setColor(input.val())

                // Open color picker on click on input
                input.on('click', _ => {
                    instance.show()
                })
                .on('keyup', _ => {
                    instance.setColor(input.val() || null)
                })
            })
            // Save
            .on('save', (color, instance) => {
                let parent = $(instance._root.root).parents('.input-field:first')

                if (color === null) {
                    parent.find('input').val('')
                    parent.find('label').removeClass('active')
                } else {
                    parent.find('input').val(color.toHEXA().toString())
                    parent.find('label').addClass('active')
                }

                instance.hide();
            })
        })
    }

    initCountTo() {
        $('.count-to').countTo()
    }

    initJsTree() {
        // Domains tree
        let domainsTree = $('#domains-tree')
        domainsTree.jstree({
            "core" : {
                "themes" : {
                    "icons": false
                },
                "data" : {
                    "url" : function (node) {
                        return node.id === '#' ?
                        $("meta[name='domains-tree-default-url']").attr('content') :
                        $("meta[name='domains-tree-children-url']").attr('content');
                    },
                    "data" : function (node) {
                        return { 'id' : node.id };
                    }
                }
            },
            "plugins" : ['search', 'sort'],
            "search" : {
                "show_only_matches" : true
            }
        })

        // Open tree automatically
        .on('ready.jstree', () => {
            if ($("meta[name='domains-tree-open-all']").attr('content')) {
                domainsTree.jstree('open_all')
            }
        })

        // Switch on domain on click
        .on('changed.jstree', (e, data) => {
            if (data.node.a_attr.href !== '#') {
                document.location.href = data.node.a_attr.href
            }
        })

        let to = false
        $('.domain-search-bar #domain-name').keyup(() => {
            if(to) {
                clearTimeout(to)
            }

            to = setTimeout(() => {
                let v = $('#domain-name').val()
                domainsTree.jstree(true).search(v)
            }, 250)
        })
    }

    initSearchBar() {
        $(".navbar-header .search-btn").on('click', () => {
            $('.navbar-header .default-bar').hide()
            $('.navbar-header .search-bar').show()
            $('.navbar-header .search-bar #search').focus()
        })

        $('.navbar-header .search-bar #search').on('focusout', () => {
            $('.navbar-header .default-bar').show()
            $('.navbar-header .search-bar').hide()
            $('.navbar-header .search-bar #search').val('')
        })
    }

    initMenuSizeSwitcher() {
        $('#menu-size-switcher').click(event => {
            $('body').toggleClass('sidenav-mini')
            let isMenuMini = $("body").hasClass('sidenav-mini')
            $('i', $(event.currentTarget)).text(isMenuMini ? 'menu' : 'menu_open')

            // Save preference
            let url = $("meta[name='user-settings-url']").attr('content')
            let data = {
                _token: $("meta[name='csrf-token']").attr('content'),
                settings: {
                    menu_mini: isMenuMini
                }
            }

            $.post(url, data)
        })
    }

    autoOpenMenu() {
        let collapsible = $('.sidenav ul.collapsible ul li.active').parents('ul.collapsible:first')
        collapsible.collapsible('open')
        collapsible.find('li:first').addClass('active')
    }

    isMobileSize() {
        return $(document).width() < 601
    }
}

new UccelloApp()
